<template>
    <div class="profile-head-container">
        <div class="profile-head-img-container">
            <img class="profile-head-picture"
                src="https://images.pexels.com/photos/3693108/pexels-photo-3693108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="">
        </div>

        <div class="profile-head-lines">
            <div class="line">
                <div class="line-left">
                    <h2>{{ name }}</h2>
                </div>
                <div class="line-right">
                    <button>Suirve</button>
                </div>
            </div>

            <div class="line">
                <div class="line-left">
                    <span>{{ nbFollower }}</span>
                    <span>Nombre Following</span>
                    <span>Nombre de production</span>
                </div>

                <div class="line-right">
                    social networks
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./ProfileHead.js" />