<template>
    <section>
        <div class="my-5">
            <Searchbar :placeholder="'Rechercher une création'" @searchData="searchAudio" />
            <div class="categories-search-buttons">
                <p>catégories:</p>
                <GenreTag :text="'Old-school'" :onClick="() => { }" />
            </div>
        </div>

        <div class="list-title-paging">
            <h3 class="list-title">Ecouté</h3>

            <Paging :totalPage="audios.totalPages" :itemsPerPage="audios.totalItems" :currentPage="audios.currentPage"
                @changePage="onPageChange" />
        </div>
        <div class="audio-list-container" v-if="dataLoaded">
            <AudioList :audios="audios.datas" />
        </div>
        <SimpleAudioPlayerComponent />
        <CommentsPanel :audioid="$store.state.commentsPanel.audio.id" />
    </section>
</template>

<script src='./Discorver.js' />