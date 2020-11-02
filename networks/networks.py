import matplotlib.pyplot as plt

import networkx as nx

# Decentralized graphs
G = nx.random_lobster(0.8, 0.9, 0.8, seed=5)

# Centralized graphs
G2 = nx.Graph() 
G2.add_nodes_from(G.nodes())

center = 0
for node in G2.nodes():
    if node != center:
        G2.add_edge(center,node)

# Distributed graph
G3 = nx.triangular_lattice_graph(10, 20, with_positions=True)
pos = nx.get_node_attributes(G3, 'pos')

# Uncomment to draw graph
# nx.draw(G, node_size=90, linewidths=.8)
# nx.draw(G2, node_size=90, linewidths=.8)
nx.draw_kamada_kawai(G3, node_size=90, linewidths=.8)
plt.show()