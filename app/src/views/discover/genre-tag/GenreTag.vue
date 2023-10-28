<template>
    <button class="button genre-tag" @click="onClick">{{ text }}</button>
</template>

<script>
import "./GenreTag.css"

export default {
    props: {
        text: { required: true },
        onClick: { required: true }
    },
}
</script>