<template>
    <div class="entry-conteiner mb-3 pointer p-2" @click="$router.push({name: 'entry', params: {id: 10}})">
        <!-- Titulo -->
        <div class="netry-title d-flex">
            <span class="text-success fs-5 fw-bold">24</span>
            <span class="mx-1 fs-5">Noviembre</span>
            <span class="mx-2 fw-light">2022, jueves</span>
        </div>

        <div class="entry-description">
            Ut exercitation mollit nulla consequat occaecat excepteur aliquip aliqua nostrud duis eiusmod tempor nostrud sit. Reprehenderit excepteur officia aute reprehenderit amet nisi deserunt amet. Ullamco aliquip adipisicing nisi sit incididunt eiusmod et sunt do officia sit quis enim.
        </div>

    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.entry-conteiner{
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover{
        background-color: lighten($color:grey, $amount: 45);
        transition: 0.2s all ease-in;

    }

    .entry-description{
        font-size: 12px;
    }
}
</style>