<script setup lang="ts">
import medal from "~/assets/medal.png";
</script>

<template>
  <IconLeftBorder :imgSrc="medal" title="Special Skills">
    <div class="flex flex-col mt-3" id="special-skills">
      <h2 class="font-semibold">Programming / Expressive Languages</h2>
      <span>
        Kotlin, Java, Groovy, Dart, JavaScript/TypeScript, SQL, Bash,
        XSLT, CSS, HTML 5, AsciiDoc, Markdown
      </span>
    </div>
    <div class="flex flex-col mt-3">
      <h2 class="font-semibold">Technologies / Frameworks</h2>
      <span>
        Spring (Spring Boot 2 incl. Webflux and Spring Cloud), Quarkus IO, Flutter, Android,
        Vue, Nuxt, React JS, Gatsby, NextJS, Eclipse RCP (Rich Client Platform), SWT/JFace/Databinding, JavaFX/AWT/Swing,
        JPA/Hibernate/EclipseLink, Junit 5, AssertJ/Assertk,
        Mockito, Mockk, Hamcrest, Spock, RxJava/Project Reactor IO/Mutiny, Resilience4J, ArrowKt, Ktor,
        Kubernetes, Terraform, GitOps/Flux, Ansible, Keycloak, Micrometer Metrics, Inbluxdb, Stackdriver,
        Prometheus, Grafana, Swagger / OAS, OpenAPI Generator, GCP (Google Cloud Platform)
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
        DOJO CLI, GitHub Actions, K9s, Lazygit, Jenkins, Postman/Newman
      </span>
    </div>
  </IconLeftBorder>
</template>
