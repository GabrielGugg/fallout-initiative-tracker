# Fallout TTRPG (plugin do Obsidian)

Ferramentas para mesas do RPG de Fallout (sistema fan made) dentro do Obsidian.

Este plugin é um fork do [Initiative Tracker](https://github.com/valentine195/obsidian-initiative-tracker),
de Jeremy Valentine, e mantém a licença **GPL-3.0** (veja `LICENSE`).

## O que já mudou

O rastreador de iniciativa agora conhece as regras de dano do sistema:

- **Estamina (SP)**: segunda barra de cada criatura. Se o alvo percebe a fonte do dano, o dano sai primeiro da Estamina.
- **Vida (HP)**: com Estamina em 0, o dano vai para os HP.
- **Tolerância a Dano (DT)**: reduz apenas o dano que chega aos HP; nunca fica abaixo de 0.
- Criatura **inconsciente** (HP 0 ou condição de inconsciente) leva o dano direto nos HP.

### Campo de dano (clique na célula de SP ou HP)

| Digitar | Efeito |
| --- | --- |
| `12` | 12 de dano: Estamina primeiro, depois HP menos DT |
| `-5` | cura 5 de HP |
| `u12` | dano sem ciência da fonte: vai direto nos HP (a DT vale) |
| `s5` | tira 5 de Estamina direto (sem DT) |
| `s-5` | recupera 5 de Estamina |
| `t5` / `m5` | HP temporário / HP máximo (como no original) |

Os modificadores de "saved" e "resist" do original continuam valendo e são aplicados **antes** da DT.

### Configuração

Em *Settings → Fallout TTRPG*: **Excess damage carries over to HP**.
Ligado (padrão): o que passa da Estamina restante continua para os HP, com a DT aplicada nesse excedente.
Desligado: um golpe sofrido com Estamina acima de 0 é totalmente absorvido por ela.

### Jogadores e criaturas

- Formulário de criatura e de jogador: campos **Max Stamina** e **DT**.
- Jogadores ligados a uma nota leem do frontmatter: `stamina` (máxima) e `dt`, além de `hp`, `ac`, `modifier`, `level`, `name`.
- Criaturas vindas de statblocks usam os campos `stamina` e `dt` quando existirem.

## Como compilar e instalar

Precisa do [Node.js](https://nodejs.org/) (versão 18 ou mais nova).

```bash
npm install
npm run build
```

Isso gera `main.js` e `styles.css` na raiz. Copie `main.js`, `manifest.json` e `styles.css` para:

```
<seu vault>/.obsidian/plugins/fallout-ttrpg/
```

Depois ative **Fallout TTRPG** em *Settings → Community plugins*.

> O plugin original (Initiative Tracker) registra os mesmos blocos de código (`encounter`, etc.).
> Desative o original enquanto usar este para evitar conflito. Os dados (`data.json`) ficam separados.

## Ideias para as próximas etapas

- Tradução da interface para português.
- Estamina no painel do jogador e nos blocos `encounter`.
- Recuperação de Estamina por rodada, se a regra existir na sua mesa.
- Outras funções do sistema (testes de perícia, itens, etc.) além da iniciativa.
