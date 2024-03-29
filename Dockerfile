#配置后端项目的docker镜像空间
FROM node:16
LABEL name="cha-node"
#目前该项目版本号
LABEL version="1.0.0"
#将项目所有文件放到/app文件夹下
COPY . /app
WORKDIR /app
#配置npm镜像源
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
# 安装项目依赖
RUN cnpm install
#项目端口号
EXPOSE 3000
#启动项目
CMD npm start