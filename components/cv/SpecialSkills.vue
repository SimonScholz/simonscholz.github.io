<script setup lang="ts">
import medal from "~/assets/medal.png";
</script>

<template>
  <IconLeftBorder :imgSrc="medal" title="Special Skills">
    <div class="flex flex-col mt-3" id="special-skills">
      <h2 class="font-semibold">Programming / Expressive Languages</h2>
      <span>
        Kotlin, Java, Groovy, JavaScript/TypeScript, SQL, XSLT, CSS, HTML 5,
        AsciiDoc, Markdown
      </span>
    </div>
    <div class="flex flex-col mt-3">
      <h2 class="font-semibold">Technologies / Frameworks</h2>
      <span>
        Spring (Spring Boot 2 incl. Webflux and Spring Cloud), Quarkus IO,
        Micrometer Metrics, Android, Dojo IO, React JS, Gatsby, NextJS, Eclipse
        RCP (Rich Client Platform), JPA/Hibernate/EclipseLink, Junit 5, AssertJ,
        Mockito, Mockk, Hamcrest, Spock, RxJava/Project Reactor IO/Mutiny,
        Kubernetes, Terraform, GitOps/Flux, Ansible, Inbluxdb, Stackdriver,
        Prometheus, Grafana, Swagger, OpenAPI Generator, GCP (Google Cloud
        Platform)
      </span>
    </div>
    <div class="flex flex-col mt-3">
      <h2 class="font-semibold">Analysis and Performance Tools</h2>
      <span>
        Sonarqube, Spotbugs, Checkstyle, Jacoco, detekt, ktlint, Gatling,
        Yourkit, JMeter
      </span>
    </div>
    <div class="flex flex-col mt-3">
      <h2 class="font-semibold">Tools</h2>
      <span>
        IntelliJ, VS Code, Eclipse, Git, Gerrit, Gradle, Maven, NPM, Spring CLI,
        DOJO CLI, GitHub Actions, Jenkins, Postman/Newman
      </span>
    </div>
  </IconLeftBorder>
</template>
