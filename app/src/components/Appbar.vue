<template>
  <v-app-bar app color="#282828" dark>
    <div style="width: 100vw;" class="d-flex justify-center align-center" id="navbar">
      <div class="navbar-side-left">
        <a class="navlink" href="/profile" v-if="$store.state.user && $route.name != 'profile'">Profile</a>
        <a class="navlink" href="/discover" v-else>Discover</a>
      </div>

      <h1 @click="$router.push('discover')" style="font-family: Brush Script MT; cursor: pointer;">Sound<span
          style="color: #EE1B1B;">Record</span></h1>

      <div class="navbar-side-left"></div>
    </div>

  </v-app-bar>
</template>

