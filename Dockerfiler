# Use uma imagem base do Nginx (servidor web leve)
FROM nginx:alpine

# Copiar os arquivos do projeto para o diretório de conteúdo do Nginx
COPY . /usr/share/nginx/html

# Expor a porta 80 (padrão para servidores HTTP)
EXPOSE 80

# Iniciar o Nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]
