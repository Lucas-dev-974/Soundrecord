<template>
    <div class="pagination">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
            Previous
        </button>
        <span class="current-page">{{ currentPage }}</span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
            Next
        </button>
    </div>
</template>

<script src="./Paging" />