# Desafio TagMe

**Aplicativo desenvolvido em apenas 3 dias como parte do processo seletivo da empresa [TagMe](https://landing.tagme.com.br/).**

## Links de acesso

**Link de acesso ao deploy:**\
https://coco-bambu.netlify.app/

**Repositórios do GitHub:**\
[Client repository](https://github.com/thiagoevg/tagme-client)
[Server repository](https://github.com/thiagoevg/tagme-server)\

## Login

**Para acessar o aplicativo através do deploy é necessário logar com um dos usuários cadastrados:**\

**Fogaça** (administrador)\
Login: fogaça\
Senha: Senha@Segura123

**Jacquin**\
Login: jacquin\
Senha: Senha@Segura123

# Informações técnicas

### Seção destinada para informações técnicas gerais.

# Back-end

**Desenvolvido em Node.js, a construção da API se alicerçou nas seguintes dependências:**

**mongoose:** Dependência utilizada para a criação dos Schemas e para a conexão com o banco de dados utilizado (MongoDB).\
**express:** Pacote utilizado para a configuração das rotas de acesso da API.\
**cors:** Proporciona o acesso ao servidor através de outras portas especificadas.\
**bcrypt:** Dependência de criptografia, utilizada na criação do passwordHash.\
**dotenv:** Permitiu a utilização de variáveis de ambiente e a criação de uma pasta oculta para o armazenamento de informações sensíveis como senhas e chaves de acesso.\
**jsonwebtoken:** Dependência utilizada para gerar o token de autenticação do usuário no sucesso do login.\
**express-jwt:** Utilizada para a verificação do token do usuário no acesso de rotas protegidas (isAuthenticated middleware).\
**cloudinary:** Pacote utilizado para o upload de images.\
**multer:** Possibilita que o banco receba um arquivo do tipo file durante o processo de upload de imagem.\
**multer-storage-cloudinary:** Estabelece a conexão entre o cloudinary e o multer.\

### Segurança

Por questões de sigilo comercial, todas as rotas da API são protegidas para o acesso exclusivo de usuários autenticados.\
Nessas rotas é feita a checagem do token enviado no headers da requisição. Caso o usuário não possua um token válido, o acesso será negado.\
O token emitido no sucesso do login expira em 8hrs, permitindo que o usuário permaneça logado durante esse intervalo.

**Extra**
Apesar de não serem utilizadas explicitamente nessa aplicação, a API também suporta rotas para a criação, edição e remoção de pratos e usuários (com suporte para upload de imagens), permitindo uma maior versatilidade para desenvolvimentos futuros do aplicativo. Por questões de segurança, as rotas citadas anteriormente são de acesso exclusivo para usuários com papel de administrador.

### Observação

**A página contendo as variáveis de ambiente (.env) não está disponível no repositório por conter chaves de acesso pessoais, que, por segurança, não devem ser publicadas. Para executar o código em um novo ambiente é necessário reconfigurar essas variáveis. Qualquer dúvida nessa etapa, estou disponível para contato através do [LinkedIn](https://www.linkedin.com/in/thiagoevg/).**

### Deploy

**-Plataforma utilizada para o deploy do banco de dados:**\
[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)\
**-Plataforma utilizada para o deploy do servidor:**\
 [Heroku](https://id.heroku.com/)

# Front-end

**Desenvolvido em Node.js, a construção do front-end se alicerçou nas seguintes dependências:**

**axios:** Pacote utilizado para a comunicação com as rotas do servidor, permitindo o consumo das informações provenientes da API.\
**react:** Biblioteca utilizada para o desenvolvimento da interface de interação com o usuário (Single Page Application). Evita o recarregamento da página inteira, melhorando a performance do aplicativo.\
**react-dom:** Proporciona a renderização do aplicativo react através do método DOM render. \
**react-router-dom:** Permite a criação das rotas do react, definindo quais componentes serão renderizados com base no url.\
**react-scripts:** Pacote com conjunto de scripts para a configuração base do React.\
**bootstrap:** Biblioteca de estilos CSS utilizada como suporte adicional para criação dos estilos da página.\
**react-bootstrap:** Biblioteca de componentes com estilo bootstrap adaptados ao React.\

### Segurança

De maneira similar como foi realizado no servidor, apenas usuários autenticados podem acessar rotas específicas do React, evitando a exposição de dados sigilosos para usuários sem o token de autenticação.\
Para a realização dessa autenticação foi utilizado o conceito de state global, aonde as informações do usuário logado (contendo o token) são armazenadas. \
Para o acesso de uma rota protegida, o componente personalizado extraí a informação do token do state global através do hook useContext, verificando se o usuário possuiu o privilégio de acesso para aquele componente. Caso o acesso seja negado, o usuário é então automaticamente reencaminhado para a home-page, evitando-se o vazamento de informações sigilosas.

**Extra 1**\
Além de componentes de acesso específico para o usuário logado, também foi desenvolvido um componente customizado exclusivamente para o acesso do administrador, permitindo a expansão futura das funcionalidades do aplicativo.

**Extra 2**\
Os dados do usuário logado além de ser armazenado no state global, também é armazenado no localStorage, evitando-se a queda do login mesmo para situações em que o navegador seja fechado. Desse modo, uma vez efetuado, o login persistirá até a expiração do token, ou a realização do checkout (sair), proporcionando uma melhor experiência ao usuário.

### Deploy

**-Plataforma utilizada para o deploy do front-end:**\
[Netlifly](https://www.netlify.com/)
