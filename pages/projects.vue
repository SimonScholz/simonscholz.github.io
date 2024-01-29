<script setup lang="ts">
useHead({
    title: "Projects",
});
</script>

<template>
    <section>
        <NuxtLink href="https://github.com/SimonScholz/qr-code-with-logo" class="project-card">
            <div class="project-image">
                <img src="https://github.com/SimonScholz/qr-code-with-logo/raw/main/docs/decent-red-color.png" alt="Qr Code With Logo">
            </div>
            <div class="project-details">
                <div class="project-title">qr-code-with-logo</div>
                <div class="project-description">Open Source project for generating qr codes with logo for the JVM.</div>
            </div>
        </NuxtLink>

        <NuxtLink href="https://github.com/SimonScholz/qr-code-with-logo" class="project-card">
            <div class="project-image">
                <img src="https://github.com/SimonScholz/qr-code-with-logo/raw/main/docs/decent-red-color.png" alt="Qr Code With Logo">
            </div>
            <div class="project-details">
                <div class="project-title">qr-code-with-logo</div>
                <div class="project-description">Open Source project for generating qr codes with logo for the JVM.</div>
            </div>
        </NuxtLink>

        <NuxtLink href="https://github.com/SimonScholz/qr-code-with-logo" class="project-card">
            <div class="project-image">
                <img src="https://github.com/SimonScholz/qr-code-with-logo/raw/main/docs/decent-red-color.png" alt="Qr Code With Logo">
            </div>
            <div class="project-details">
                <div class="project-title">qr-code-with-logo</div>
                <div class="project-description">Open Source project for generating qr codes with logo for the JVM.</div>
            </div>
        </NuxtLink>
    </section>
</template>

<style scoped>
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
}

section {
    @apply flex flex-wrap justify-around p-8;
}

.project-card {
    @apply bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:-translate-y-2;
    width: 300px;
    margin: 1em;
}

.project-image {
    @apply h-40 overflow-hidden flex items-center justify-center;
}

.project-image img {
    @apply w-full h-full object-contain;
}

.project-details {
    @apply p-4;
}

.project-title {
    @apply text-lg font-bold mb-2;
}

.project-description {
    @apply text-gray-600;
}
</style>
