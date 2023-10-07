<template>
    <section>
        <div class="my-5">
            <Searchbar :placeholder="'Search'" @searchData="searchAudio" />
        </div>
        <h3 class="list-title">Ecouté</h3>
        <div class="audio-list-container" v-if="dataLoaded">
            <AudioList :audios="audios.datas" />
        </div>
        <Paging :totalItems="audios.totalItems" :currentPage="audios.currentPage" @changePage="onPageChange" />
        <SimpleAudioPlayerComponent />
        <CommentsPanel :audioid="$store.state.commentsPanel.audio.id" />
    </section>
</template>

<script src='./Discorver.js' />