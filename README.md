# ECOMMERCE SMD

Esse projeto foi criado com o objetivo de ser a avaliação final da disciplina de Programação Web 1 ministrada pelo professor Leonardo Moreira no semestre letivo 2019.1 do curso Sistemas e Mídias Digitais da Univerdade Federal do Ceará. 


#### Responsáveis pelo Projeto:

  - [Matrícula: 387366] Djheyson Carlos de Oliveira Assis
  - [Matrícula: 397874] Rafaelly Freitas Ferreiras


## Executando o Projeto

### O que é necessário instalar?

  - Ruby versão 2.2.6
  - Rails versão 5.2.3
  - PostgreSQL
  
  
*DICA: O site a seguir possue todos os componentes necessários para a instalação https://gorails.com/setup/ubuntu/16.04*
  
### Executando pela primeira vez:

#### 1. Criando o Banco de Dados

Na interface do PostgreSQL crie uma database com o nome **desenv** e dentro dela um schema com o nome de **ecommerce**

*DICA: Caso deseje alterar alguma configuração relacionada a nomeclatura e configuração do banco, basta alterar a informação no arquivo database.yml*

Após baixar ter baixado a aplicação na sua máquina e criado o Banco de Dados, usando o **prompt de comando** entre na pasta do projeto e continue com os passos a seguir:

#### 2. Intalando as dependências do projeto

> bundle install
   
Com o comando acima você estatá intalando a lista de dependências que são necessárias para esse projeto rodar.


#### 3. Criando as tabelas no Banco de Dados

> rake db:migrate

Após rodar esse comando você vai ter criado todas as tabelas do seu projeto no schema que você no tópico anterior.

#### 4. Subindo o servidor

> rails s 

Usando esse comando você sobe o projeto no servidor local e sua aplicação já esta pronta pra uso na url http://localhost:3000/
