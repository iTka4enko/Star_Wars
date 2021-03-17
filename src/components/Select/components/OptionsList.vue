<template>
    <ul 
        class="selectList"
        :style="`width: ${width}px;`"
    >
        <li 
            @click="$emit('select', option)"
            :class="[selected === option ? 'selectList__option--selected': '']"
            class="selectList__option"
            v-for="option in options"
            :key="option"
        >
            {{option}}
        </li>
    </ul>
</template>

<script>
export default {
    props:{
        options: Array,
        selected: String,
        width: Number
    },
    data(){
        return{
            selectedOption: '',
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/colors.scss';

.selectList{
    background-color: #FFFFFF;
    box-shadow: $shadow;
    border-radius: 6px;

    &__option{
        padding: 5px 8px;
        line-height: 180%;
        font-weight: 100;

        &:first-child{
            margin-top: 0;
            border-radius: 6px 6px 0 0;
        }
        &:last-child{
            border-radius: 0 0 6px 6px;
        }

        &--selected{
            background-color: $selected;
        }
        &:hover{
            background-color: $primary;
        }
    }
}
</style>