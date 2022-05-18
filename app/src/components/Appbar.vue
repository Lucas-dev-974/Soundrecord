<template>
    <v-app-bar app color="#282828" dark>
      <div style="width: 100vw;" class="d-flex justify-space-between align-center">
        <div>
          <a href="/profile" v-if="$store.state.user && $route.name != 'profile'">Profile</a>
        </div>

        <h1 @click="$router.push('discover')" style="font-family: Brush Script MT; cursor: pointer;">Sound<span style="color: #EE1B1B;">Record</span></h1>
        
        <div ></div>     
      </div>

    </v-app-bar>
</template>

