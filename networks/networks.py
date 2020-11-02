import matplotlib.pyplot as plt

import networkx as nx

# G = nx.random_geometric_graph(50, 0.1, seed=5)
# G = nx.gnm_random_graph(20, 1, seed=5)
G = nx.random_lobster(0.8, 0.9, 0.8, seed=5)
# G = nx.watts_strogatz_graph(100, 8, 0.1)

G2 = nx.Graph() 
G2.add_nodes_from(G.nodes())

center = 0
for node in G2.nodes():
    if node != center:
        G2.add_edge(center,node)


G3 = nx.triangular_lattice_graph(10, 20, with_positions=True)
pos = nx.get_node_attributes(G3, 'pos')


# nx.draw(G, node_size=90, linewidths=.8)
# nx.draw(G2, node_size=90, linewidths=.8)
# nx.draw(G3, pos=pos, node_size=60, linewidths=.8)
nx.draw_kamada_kawai(G3, node_size=90, linewidths=.8)
# nx.draw_spectral(G3, node_size=60, linewidths=.8)
# nx.draw_random(G)
# nx.draw_circular(G)
# plt.draw()
plt.show()