<template>
    <div v-if="user">
        <section id="profile-head">
            <ProfileHead :user="user" />
        </section>

        <section id="profile-tab">
            <div class="line gap-5">
                <p>Titres</p>
                <p>Tracks</p>
                <p>Favories</p>
                <p>Mure de music</p>

                <p>Sessions</p>
            </div>
        </section>
    </div>
</template>

<script src="./Profile.js" />