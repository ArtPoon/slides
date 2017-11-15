import sys
import re

edge_regex = re.compile('"(.+)"--"(.+)".+([0-9]+\.[0-9]+)')
node_regex = re.compile('"(.+)".+\[.+shape="(.+)".+fillcolor="(.+)".+\s+width=([0-9]\.[0-9]+)')

dotfile = open(sys.argv[1])

edges = []
nodes = {}
node_attribs = {}

alphabet = "IGHUTDNALWPQ"
def convert_nodename(nodename):
    res = ''
    for i in str(nodename):
        res += alphabet[int(i)]
    return(res)


for line in dotfile:
    if '--' in line:
        # edge
        matches = edge_regex.findall(line)
        if len(matches) == 0:
            print('failed to parse line')
            print(line)
            sys.exit()
        node1, node2, dist = matches[0]
        edges.append( (convert_nodename(node1), convert_nodename(node2), float(dist)) )
        continue
    
    # else might be a node
    matches = node_regex.findall(line)
    if len(matches) == 0:
        continue
    node, shape, fillcolor, width = matches[0]
    
    nodes.update({convert_nodename(node): len(nodes)})  # index
    
    node_attribs.update({convert_nodename(node): {
        'group': 0 if shape == 'circle' else 1,
        'geno': 'R' if fillcolor=='firebrick' else 'S',
        'r': float(width)
    }})
    

# output nodes
intermed = list(nodes.keys())
intermed.sort()
for node in intermed:
    a = node_attribs[node]
    s = '"id":"{}", "group":"{}", "geno":"{}", "r":{}'.format(node, 
        a['group'], a['geno'], a['r'])
    print('{'+s+'},')

# output edges
edges.sort()
for node1, node2, dist in edges:
    s = '"source":"{}", "target":"{}", "dist":{}'.format(node1, node2, dist)
    print('{'+s+'},')
