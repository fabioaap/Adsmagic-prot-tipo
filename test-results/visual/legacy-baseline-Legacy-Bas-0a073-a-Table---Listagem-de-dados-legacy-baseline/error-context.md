# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "Não é possível acessar esse site" [level=1] [ref=e7]
    - paragraph [ref=e8]:
      - text: A conexão com
      - strong [ref=e9]: localhost
      - text: foi recusada.
    - generic [ref=e10]:
      - paragraph [ref=e11]: "Tente:"
      - list [ref=e12]:
        - listitem [ref=e13]: Verificar a conexão
        - listitem [ref=e14]:
          - link "Verificar o proxy e o firewall" [ref=e15] [cursor=pointer]:
            - /url: "#buttons"
    - generic [ref=e16]: ERR_CONNECTION_REFUSED
  - generic [ref=e17]:
    - button "Recarregar" [ref=e19] [cursor=pointer]
    - button "Saiba mais" [ref=e20] [cursor=pointer]
```