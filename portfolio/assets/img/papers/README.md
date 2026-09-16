# Per-paper figures

Drop one image in this folder for each publication, named exactly as below. The site picks
it up automatically — no HTML editing needed. An entry whose file is missing simply renders
without a thumbnail, so you can add them one at a time.

| Filename | Paper |
|---|---|
| `punishment-loners.jpg` | The Role of Punishment and Loners in Shaping Cooperation across Network Topologies |
| `q-learning-three-strategy.jpg` | Q-Learning Driven Adaptive Decision Rules and Environmental Transformation in Three-Strategy Evolutionary Games |
| `low-birth-weight-ml.jpg` | Unveiling Socio-Demographic Determinants of Low Birth Weight Using Machine Learning Techniques |
| `asymmetric-dyadic-game.jpg` | Strategic Evolution under Varying Dilemma Strength and Social Efficiency Deficit in Asymmetric Dyadic Game |
| `antibiotic-resistance.jpg` | Assessing the Social Dilemmas in Eco-Evolutionary Dynamics of Cooperation, Cheating, and Resistance under Antibiotic Pressure — **added** |
| `optional-prisoners-dilemma.jpg` | Trait-Mediated Evolutionary Dynamics in the Optional Prisoner's Dilemma (OPD) Game — *under review* |
| `cooperative-space-vaccination.jpg` | Influence of Cooperative Space and Vaccination Behavior on Epidemic Disease Dynamics under an Emergency — *under review* |

## What works well here

The thumbnail sits in a 210 px, 4:3 white plate and the whole figure is fitted inside it
(`object-fit: contain`), so nothing is cropped away. Clicking it opens the full-size image in
a new tab, which is where a reader goes to actually read the panels.

- **Good:** a phase diagram, a heat map, a lattice snapshot, a bifurcation diagram — anything
  with a strong overall shape that survives being shrunk.
- **Workable:** a multi-panel composite. It reads as a recognisable shape at thumbnail size
  and the reader clicks through for the detail.
- **Poor:** a table, or a single plot that is mostly white space and axis labels.

Export at roughly **1000–1400 px** on the long edge, JPEG quality 85. PNG works too — if you
use PNG, change the extension in `index.html` for that one entry.

Figures published in Elsevier, PLOS or Royal Society journals are usually reusable by the
author on a personal academic page, but the exact terms depend on the copyright agreement
you signed for each paper. Worth a glance before posting a figure from a paywalled article.
