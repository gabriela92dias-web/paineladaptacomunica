# ESPECIFICACAO - VERDE CORE V2

**Status:** Aprovado para consolidacao  
**Escopo:** Interface institucional e chrome principal do produto  
**Relacionado a:** `integracao-funcional.html`, `estilos.css`, `app.js`

---

## 1. Tese do sistema

O **Verde Core v2** define a linguagem cromatica institucional da Adapta.

Ele substitui a logica de "um unico verde para tudo" por uma **familia tonal verde**, com papeis semanticos distintos para texto, preenchimento, apoio, contorno e sinal de alta enfase.

O objetivo e manter:

- identidade institucional forte;
- leitura monocromatica da marca;
- maior hierarquia interna na interface;
- mais respiracao entre estrutura e destaque;
- separacao clara entre interface institucional e contextos multicor.

---

## 2. Principios

### 2.1 Monocromia por familia, nao por token unico

A interface institucional e monocromatica em verde, mas nao depende de uma unica cor para todos os elementos.  
Os componentes pertencem a uma mesma familia cromatica, com intensidades e papeis diferentes.

### 2.2 Verde = identidade e interacao

O verde continua sendo a familia principal da marca em:

- navegacao;
- icones e links;
- componentes interativos;
- acao principal;
- destaques institucionais.

### 2.3 Neutros = estrutura

Os neutros sustentam:

- fundos;
- superficies;
- texto corrido;
- separacao de blocos;
- apoio visual.

Os neutros devem ser discretamente aquecidos para conversar com a familia verde, sem virar uma segunda familia expressiva.

### 2.4 Alta enfase nao e a regra

O verde claro e quente de alta visibilidade existe no sistema, mas com uso controlado.  
Ele aparece como **sinal** e nao como base universal da interface.

### 2.5 Multicor nao invade o chrome institucional

Paletas multicor ficam reservadas a:

- campanhas;
- visualizacao de espectro;
- simulacoes cromaticas;
- conteudo editorial expandido;
- ferramentas analiticas;
- alertas administrativos especificos.

---

## 3. Arquitetura cromatica

O sistema se organiza em 3 camadas:

### 3.1 Paleta primitiva

Escalas base aprovadas, ainda sem funcao final.

### 3.2 Tokens semanticos

Mapeamento dos papeis da interface.

### 3.3 Regras de uso

Decisoes sobre onde cada token entra e onde nao deve entrar.

---

## 4. Paleta primitiva aprovada

### 4.1 Green scale

```txt
green.050    #F4F8F0
green.100    #DFE8D8
green.signal #BFE5AE
green.300    #AAC19D
green.500    #77937A
green.700    #33564B
green.900    #132923
```

### 4.2 Papel conceitual dos verdes

- `green.050` -> atmosfera muito clara e respiracao
- `green.100` -> apoio suave e fundos verdes leves
- `green.signal` -> luz da marca, modernidade, CTA de alta enfase
- `green.300` -> preenchimento controlado e ponte entre claro e medio
- `green.500` -> destaque medio, borda ativa e suporte de navegacao
- `green.700` -> verde institucional principal
- `green.900` -> verde profundo, denso e estrutural

### 4.3 Neutral scale

```txt
neutral.000  #FFFFFF
neutral.050  #F7F8F4
neutral.100  #ECEEE7
neutral.300  #C8CDC3
neutral.500  #6E786D
neutral.700  #434A43
neutral.900  #1A211C
neutral.950  #0D110E
```

### 4.4 Papel conceitual dos neutros

- `neutral.000` -> superficie maxima e contraste no light
- `neutral.050` -> fundo geral claro
- `neutral.100` -> superficie sutil e divisao leve
- `neutral.300` -> texto suave no dark e bordas discretas
- `neutral.500` -> texto secundario
- `neutral.700` -> texto ou apoio estrutural intermediario
- `neutral.900` -> texto principal no light e superficie no dark
- `neutral.950` -> fundo principal no dark

### 4.5 Data/admin

Uso restrito a analise, simulacao ou sinalizacao administrativa.

```txt
data.purple  #9886B3
data.pink    #FF89DA
data.yellow  #FFEC88
data.orange  #FFB36B
```

---

## 5. Tokens semanticos

### 5.1 Light mode

```txt
bg               neutral.050
surface          neutral.000
surfaceSubtle    neutral.100

text             neutral.900
textMuted        neutral.500

brandInk         green.700
brandFill        green.700
brandFillText    neutral.000

brandSignal      green.signal
brandSignalText  neutral.950

brandSoft        green.100
brandBorder      green.300
brandHighlight   green.500

focusRing        green.500
```

### 5.2 Dark mode

```txt
bg               neutral.950
surface          neutral.900
surfaceSubtle    #222923

text             #F7FAF8
textMuted        neutral.300

brandInk         green.100
brandFill        green.300
brandFillText    neutral.950

brandSignal      green.signal
brandSignalText  neutral.950

brandSoft        rgba(170, 193, 157, 0.16)
brandBorder      green.500
brandHighlight   green.100

focusRing        green.300
```

---

## 6. Definicao de papeis

### 6.1 brandInk

Uso:

- links;
- icones principais;
- numeros destacados;
- tabs ativas por texto;
- labels selecionadas;
- destaques textuais curtos.

Nao usar:

- como fundo de CTA principal;
- como preenchimento universal de badges e botoes.

### 6.2 brandFill

Uso:

- botoes primarios padrao;
- barras de progresso;
- badges filled de uso recorrente;
- toggles ativos;
- pequenos preenchimentos estruturais.

Nao usar:

- para competir com `brandSignal`;
- como destaque luminoso principal da pagina.

### 6.3 brandSignal

Uso:

- CTA hero;
- acao principal especial;
- momentos de modernidade e brilho controlado;
- pontos de alta enfase em fluxos institucionais.

Nao usar:

- como cor padrao de todos os componentes;
- para pintar todo estado ativo;
- como substituto de `brandInk`, `brandFill` e `brandSoft`.

### 6.4 brandSoft

Uso:

- hover;
- selecao sutil;
- pills suaves;
- fundo de icone;
- apoios visuais leves.

### 6.5 brandBorder

Uso:

- contorno ativo;
- foco;
- estado selecionado leve;
- borda de separacao com identidade.

### 6.6 brandHighlight

Uso:

- destaque secundario;
- suporte de navegacao;
- dados destacados sem virar CTA;
- enfase intermediaria.

---

## 7. Mapa por componente

### 7.1 Botoes

**Botao primario padrao**

- background: `brandFill`
- texto: `brandFillText`

**Botao primario especial / hero**

- background: `brandSignal`
- texto: `brandSignalText`

**Botao secundario**

- fundo: transparente ou `surface`
- borda: `brandBorder`
- texto: `brandInk`

### 7.2 Links

- texto: `brandInk`
- hover: underline ou intensificacao leve

### 7.3 Badges e pills

**Filled recorrente**

- fundo: `brandFill`
- texto: `brandFillText`

**Soft**

- fundo: `brandSoft`
- texto: `brandInk`

**Sinal**

- somente quando o badge for o ponto principal de enfase

### 7.4 Tabs

- inativa: `textMuted`
- ativa por texto: `brandInk`
- borda/indicador: `brandBorder`
- fundo opcional: `brandSoft`

### 7.5 Stats

- numero: `brandInk`
- estrutura: `surface` e neutros

### 7.6 Cartoes e superficies

- fundo principal: `surface`
- variacao leve: `surfaceSubtle`
- identidade interna: `brandSoft`, `brandBorder` ou `brandInk`, conforme a funcao

### 7.7 Foco

- `focusRing`

---

## 8. Relacao entre Verde Core e Color Core

### 8.1 Verde Core

Responsavel por:

- chrome do produto;
- interface institucional;
- componentes base;
- navegacao;
- padrao recorrente da marca.

### 8.2 Color Core

Responsavel por:

- campanhas;
- modulos tematicos;
- linguagem editorial expandida;
- visualizacao de espectro;
- simulacao e analise cromatica.

### 8.3 Regra de fronteira

O Color Core nao substitui a estrutura institucional.  
Ele entra como camada expressiva ou analitica, sem quebrar a leitura principal do produto.

---

## 9. Regras de governanca

### 9.1 O que preservar

- o sistema continua monocromatico por familia;
- o verde claro quente nao volta a ser universal;
- neutros continuam subordinados ao verde;
- multicor permanece contextual.

### 9.2 O que evitar

- criar novos verdes medios muito proximos entre si;
- usar `brandSignal` como acao padrao de tudo;
- reaquecer neutros a ponto de virar paleta bege;
- misturar Color Core na navegacao institucional.

### 9.3 Criterio para futuras decisoes

Toda nova cor ou novo uso deve responder:

1. Isso pertence ao chrome institucional ou ao conteudo expressivo?
2. Esse papel ja existe em `brandInk`, `brandFill`, `brandSignal`, `brandSoft`, `brandBorder` ou `brandHighlight`?
3. O uso aumenta a hierarquia ou volta a achatar a interface?

---

## 10. Checklist de avaliacao

Antes de aprovar uma nova aplicacao do sistema, verificar:

- A estrutura ainda respira?
- O verde continua sendo assinatura, e nao ruido?
- O CTA especial esta reservado ao que realmente precisa de alta enfase?
- Os neutros continuam discretos, mas conectados ao verde?
- O multicor esta restrito ao contexto certo?

---

## 11. Artefato de referencia

Preview visual aprovada nesta etapa:

- `integracao-funcional.html`

Essa preview existe para validar:

- relacao entre verdes;
- relacao entre verdes e neutros;
- comportamento de light e dark mode;
- diferenca entre accent unico e familia tonal;
- uso controlado do `brandSignal`.

---

## 12. Proximo passo recomendado

Com o Verde Core v2 consolidado, o proximo movimento do sistema deve ser:

1. aplicar os tokens em componentes reais;
2. documentar exemplos de implementacao;
3. abrir o desenho do **Color Core v1** sem reabrir a base institucional.
