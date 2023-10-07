<template>
    <div class="profile-head-container">
        <div id="profile-head-img-container" profilePictureRef={profilePictureRef}>
            <img src="https://images.pexels.com/photos/3693108/pexels-photo-3693108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="">
        </div>

        <div class="profile-head-lines">
            <div class="line justify-between">
                <div class="line-left">
                    <h2>{{ user.pseudo }}</h2>
                </div>
                <div class="line-right">
                    <button>Suirve</button>
                </div>
            </div>

            <div class="line justify-between">
                <div class="line-left">
                    <div class="line">
                        <span>{{ nbFollower }} |</span>
                        <span>Nb production</span>
                    </div>

                    genres
                </div>

                <div class="line-right">
                    social networks
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./ProfileHead.js" />