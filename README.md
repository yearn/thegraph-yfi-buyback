# YFI Buyback Subgraph

![License](https://img.shields.io/badge/license-MIT-green)
![CI](https://github.com/yearn/thegraph-yfi-buyback/workflows/CI/badge.svg)

Subgraph to track Yearn's YFI buybacks.

Live versions:

- [Mainnet](https://thegraph.com/hosted-service/subgraph/yearn/yfi-buyback)

## Setup

- Copy `.envrc.example` to `.envrc`.
- Set your The Graph `ACCESS_TOKEN`.
- Set `GRAPH_PATH`.

## Running

- `yarn` – install dependencies
- `yarn codegen` – generate code
- `yarn create` – add subgraph name to Graph Node
- `yarn deploy` - deploy supgraph to Graph Node
- `yarn publish-graph` – run all steps in one command
