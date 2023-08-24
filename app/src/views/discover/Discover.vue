<template>
    <section>
        <div class="my-5">
            <Searchbar :placeholder="'Search'" @searchData="searchAudio" />
        </div>
        <div class="audio-list-container" v-if="dataLoaded">
            <AudioList :audios="audios.datas" />
        </div>
        <Paging :totalItems="audios.totalItems" :currentPage="audios.currentPage" @changePage="onPageChange" />
        <SimpleAudioPlayerComponent />
    </section>
</template>

<script src='./Discorver.js' />