<template>
    <div class="pagination">
        <button class="paging-btn paging-previous" @click="changePage(currentPage - 1)" :disabled="currentPage === 0" />
        {{ currentPage }}
        <button class="paging-btn paging-next" @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages" />

        <!-- {{ totalItems }} -->
    </div>
</template>

<script src="./Paging.js" />