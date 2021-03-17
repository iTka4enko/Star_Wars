<template>
    <div class="selectRange">
        <div class="selectRange__textInputs">
            <input 
                type="text" 
                v-model="minVal"
                @change="rangeHandler"
            >
            <input 
                type="text"
                v-model="maxVal"
                @change="rangeHandler"
            >
        </div>
        <div class="selectRange__unit">
            <div>{{min}}<span>{{unit}}</span></div>
            <div>{{max}}<span>{{unit}}</span></div>
        </div>
        <div class="selectRange__rangeInputs">
            <input 
                type="range"
                :min="min"
                :max="max"
                v-model.number="minVal"
                @change="rangeHandler"
            >
            <input 
                type="range"
                :min="min"
                :max="max"
                v-model.number="maxVal"
                @change="rangeHandler"
            >
        </div>
    </div>
</template>

<script>
export default {
    props:{
        min: Number,
        max: Number,
        defaultMin: Number,
        defaultMax: Number,
        unit: String,
    },
    data(){
        return{
            minVal: this.defaultMin !== null ? this.defaultMin : this.min,
            maxVal: this.defaultMax !== null ? this.defaultMax : this.max,
        }
    },
    methods:{
        rangeHandler(){
            if(this.minVal > this.maxVal){
                let tempMax = this.maxVal
                this.maxVal = this.minVal
                this.minVal = tempMax
            }
            this.$emit('select', {min: this.minVal, max: this.maxVal})
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/colors.scss';

$h: 2px;
$w: auto;

.selectRange{
    width: 250px;
    padding: 20px;

    background-color: #FFFFFF;
    box-shadow: $shadow;
    border-radius: 6px;

    font-weight: 100;
    line-height: 180%;

    &__textInputs{
        display: flex;

        input{
            width: 100px;

            &:last-child{
                margin-left: 9px;
            }
        }
    }
    &__unit{
        display: flex;
        justify-content: space-between;

        margin-top: 14px;

        span{
            margin-left: 3px;
        }
    }
    &__rangeInputs{
        background: linear-gradient(0deg, $red $h, transparent 0);

        display: grid;
        grid-template-rows: max-content $h;

        margin-top: 20px;
        width: auto;

        @mixin track() {
            background: none; /* get rid of Firefox track background */
            height: 100%;
            width: 100%;
        }

        @mixin thumb() {
            background: currentcolor;
            border: none; /* get rid of Firefox thumb border */
            border-radius: 0; /* get rid of Firefox corner rounding */
            pointer-events: auto; /* catch clicks */
            width: 10px; height: 10px;
            border-radius: 50%;

            margin-top: -4px;
        }

        input[type='range'] {
            grid-column: 1;
            grid-row: 2;

            &::-webkit-slider-runnable-track, 
            &::-webkit-slider-thumb, & { -webkit-appearance: none; }
            
            /* same as before */
            background: none; /* get rid of white Chrome background */

            color: $red;
            font: inherit; /* fix too small font-size in both Chrome & Firefox */
            margin: 0;
            pointer-events: none; /* let clicks pass through */
            
            &::-webkit-slider-runnable-track { @include track; }
            &::-moz-range-track { @include track; }
            
            &::-webkit-slider-thumb { @include thumb; }
            &::-moz-range-thumb { @include thumb; }
        }
    }
}
</style>
