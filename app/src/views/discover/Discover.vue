<template>
    <section>
        <Searchbar :placeholder="'Search'" />
        <div class="audio-list-container">
            <div v-for="audio in audios.datas" :key="audio.id" class="audio-list-item">
                {{ audio.name }}
                <button @click="play(audio.src)">play</button>
            </div>
            <Paging :totalItems="audios.totalItems" :currentPage="audios.currentPage" @changePage="onPageChange" />
        </div>
    </section>
</template>

<script src='./Discorver.js' />