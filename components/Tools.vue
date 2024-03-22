<script setup lang="ts">
interface Tool {
  imgSrc: string;
  imgAlt?: string;
  name: string;
}

const tools: Tool[] = [
  {
    imgSrc:
      "https://raw.githubusercontent.com/SimonScholz/simonscholz/c826feb58203a6eb3be9247f38d48d55c63a7c7e/img/quarkus.svg",
    name: "Quarkus",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    name: "Spring",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ktor/ktor-original.svg",
    name: "Ktor",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    name: "Git",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    name: "Linux",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg",
    name: "Ubuntu",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg",
    name: "IntelliJ",
  },
  {
    imgSrc: "https://cdn.icon-icons.com/icons2/1381/PNG/512/eclipse_94656.png",
    name: "Eclipse RCP",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    name: "VS Code",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    name: "GitHub",
  },
  {
    imgSrc:
      "https://gradle.com/wp-content/themes/fuel/assets/img/branding/gradle-elephant-icon-gradient.svg",
    name: "Gradle",
  },
  {
    imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg",
    name: "Maven",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gatling/gatling-original.svg",
    name: "Gatling",
  },
  {
    imgSrc: "https://api.iconify.design/material-symbols/terminal-rounded.svg",
    name: "Bash",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openapi/openapi-original.svg",
    name: "Openapi",
  },
  {
    imgSrc:
      "https://github.com/SimonScholz/simonscholz/raw/master/img/postman.svg",
    name: "Postman",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    name: "MongoDB",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    name: "Redis",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg",
    name: "Postgresql",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/liquibase/liquibase-original-wordmark.svg",
    name: "Liquibase",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    name: "Docker",
  },
  {
    imgSrc: "https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg",
    name: "Kubernetes",
  },
  {
    imgSrc: "https://www.vectorlogo.zone/logos/fluxcdio/fluxcdio-icon.svg",
    name: "GitOps",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
    name: "Terraform",
  },
  {
    imgSrc:
      "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg",
    name: "GCP",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg",
    name: "Cloudflare",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg",
    name: "Prometheus",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg",
    name: "Grafana",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opentelemetry/opentelemetry-original.svg",
    name: "Opentelemetry",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jaegertracing/jaegertracing-original.svg",
    name: "Jaeger",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    name: "Flutter",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    name: "VueJS",
  },
  {
    imgSrc:
      "https://nuxt.com/assets/design-kit/icon-green.svg",
    name: "Nuxt",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    name: "React",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    name: "GraphQl",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    name: "Tailwind CSS",
  },
];
</script>

<template>
  <main
    class="grid gap-4 max-[400px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6"
  >
    <SkillCard
      v-for="(tool, index) in tools"
      :key="index"
      :img-src="tool.imgSrc"
      :img-alt="tool.imgAlt || tool.name"
    >
      {{ tool.name }}
    </SkillCard>
  </main>
</template>
