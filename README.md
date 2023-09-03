# level-control-system
Proposal for Completion of Graduation Course Work submitted as a requirement to obtain the title of Bachelor of Electrical Engineering from the Bachelor of Electrical Engineering Course at the Federal Technological University of Paraná.

## Regras de negócio:

### [1] Microcontrolador

Manda a informação para o Broker MQTT, em um determinado tópico

### [2] Broker MQTT

Pega e repassa todas as informações

### [3] Algoritmo de Controle

Recebe informações de [4]

Quais são os tópicos a serem escutados?

Quais são os parâmetros a serem aplicados a determinados tópicos

Liga / Desliga o controle

##### Permissões:

- Ligar ou desligar: Admin
- Adicionar novos tópicos: Admin / Engenheiro
- Alterar parametros: Admin / Engenheiro

### [4] Gerencia
