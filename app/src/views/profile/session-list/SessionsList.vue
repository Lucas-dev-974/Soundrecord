<template>
    <section class="profile-content-section">
        <header class="profile-content-header">
            <SearchBar onKeyPressEnter="sz" placeholder="Recherchez une session" />
            <v-icon @click="addSession">mdi-plus</v-icon>
        </header>

        <div class="profile-content-content">
            <!-- List of  sessions -->
        </div>
    </section>
</template>

<script src="./SessionsList.js" />