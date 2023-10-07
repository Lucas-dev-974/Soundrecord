<template>
    <div v-if="user">
        <section id="profile-head">
            <ProfileHead :user="user" />
        </section>

        <section id="profile-tab">
            <div class="line gap-5">
                <p v-if="userprofile == true" class="profile-view-selector" @click="() => changeView('sessions')">Sessions
                </p>
                <p class="profile-view-selector" @click="() => changeView('tracks')">Tracks</p>
                <p class="profile-view-selector" @click="() => changeView('favories')">Favories</p>
                <p class="profile-view-selector" @click="() => changeView('music-wall')">Mur de music</p>
            </div>

            <div>
                <SessionsList v-if="viewname == 'sessions'" />
            </div>
        </section>
    </div>
</template>

<script src="./Profile.js" />