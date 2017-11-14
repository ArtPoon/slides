"""
Target format:          
    var json = {
        "nodes":[
            {"name":"node1", "r":1},
            {"name":"node2", "r":2},
            {"name":"node3", "r":2},
            {"name":"node4", "r":3}
        ],
        "links":[
            {"source":2,"target":1,"dist":1},
            {"source":0,"target":2,"dist":3}
        ]
	};
"""
import sys
from Bio import Phylo

t = Phylo.read(sys.argv[1], 'newick')

depths = t.depths(unit_branch_lengths=True)  # dict
nodes = t.get_nonterminals(order='postorder') + t.get_terminals()
olinks = []  # output lists
onodes = []
index = {}

for i, node in enumerate(nodes):
	if node.name is None:
		genotype = ''
		node.name = 'Node{}'.format(i)
	else:
		genotype = node.name.split('_')[1]
	
	depth = depths[node]
	for child in node.clades:
		olinks.append( (node.name, child.name, child.branch_length) )
	onodes.append( (node.name, genotype, depth/10) )
	index.update({node.name: len(index)})

output = 'var json = {\n\t"nodes":[\n'
for onode in onodes:
	output += '\t{"id":"%s", "label":"%s", "r":%f},\n' % onode
output += '\t],\n"links":[\n'
for source, target, blen in olinks:
	output += '\t{"source":%d, "target":%d, "dist":%1.5f},\n' % (index[source], index[target], blen)
output += '\t]\n};\n'

print(output)
