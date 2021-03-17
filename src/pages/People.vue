<template>
    <div class="container">
        <div class="peoples">
            <h1>People</h1>
            <div class="peoples__filters">
                <Select 
                    @select="(color)=>{changeEyeColor(color)}" 
                    :options="eyesColors" 
                    :selectDefault="selectedEyesColor"
                    defaultText="Eyes color"
                    :width="80"
                />
                <Select 
                    @select="(range)=>{changeHeightRange(range)}" 
                    type="range"
                    :min="height_range.min"
                    :max="height_range.max"
                    :minVal="selectedHeightRange.min"
                    :maxVal="selectedHeightRange.max"
                    unit="cm"
                    defaultText="height"
                />
                <Select 
                    @select="(range)=>{changeAgeRange(range)}" 
                    type="range"
                    :min="age_range.min"
                    :max="age_range.max"
                    :minVal="selectedAgeRange.min"
                    :maxVal="selectedAgeRange.max"
                    unit="BBY"
                    defaultText="age"
                />
                <Select 
                    @select="(sort)=>{changeSortOption(sort)}" 
                    :options="sortOptions" 
                    :selectDefault="selectedSortOption"
                    defaultText="Sort by"
                    :burgerMenu="true"
                    :width="65"
                />
            </div>
            <div class="peoples__container">
                <div 
                    class="peoples__items" 
                    v-if="filteredAndSorted.length"
                >
                    <CharacterCard 
                        class="peoples__item"
                        v-for="character in filteredAndSorted"
                        :key="character.name"
                        :character="character"
                    />
                </div>
                <div 
                    v-else-if="charactersLoaded"
                    class="peoples__items" 
                >
                    <div class="peoples__noPeoples">
                        <h2>No peoples</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {camelize, kebabize} from '@/helpers/index';

import CharacterCard from '@/components/CharacterCard'
import Select from '@/components/Select/Select'

export default {
    components:{
        CharacterCard,
        Select
    },
    data(){
        return{
            charactersLoaded: false,
            characters: {
                results: []
            },
            filteredAndSorted: [],
            
            //filters
            eyesColors:[
                'blue',
                'blue-gray',
                'brown',
                'red',
                'yellow'
            ],
            selectedEyesColor: '',

            age_range:{
                min: 12,
                max: 112
            },
            selectedAgeRange: {
                min: null,
                max: null
            },

            height_range:{
                min: 96,
                max: 202
            },
            selectedHeightRange: {
                min: null,
                max: null
            },
            // sort
            sortOptions:[
                'age',
                'mass',
                'height'
            ],
            selectedSortOption: ''
        }
    },
    methods:{
        changeEyeColor(color){
            this.selectedEyesColor = color
            this.filterAndSortCharacters()
        },
        changeAgeRange(range){
            this.selectedAgeRange.max = range.max
            this.selectedAgeRange.min = range.min
            this.filterAndSortCharacters()
        },
        changeHeightRange(range){
            this.selectedHeightRange.max = range.max
            this.selectedHeightRange.min = range.min
            this.filterAndSortCharacters()
        },
        changeSortOption(sort){
            this.selectedSortOption = sort
            this.filterAndSortCharacters()
        },
        filterAndSortCharacters(){
            this.filteredAndSorted = []

            let result = [...this.characters.results]
            let path = ''

            //filter
            if(this.selectedEyesColor){
                result = result.filter(character => character.eye_color === this.selectedEyesColor)
                
                path = path + `eye-color=${camelize(this.selectedEyesColor)}__`
            }
            if(this.selectedAgeRange.max){
                result = result.filter(character => {
                    let age = Number(character.birth_year.split('BBY')[0])
                    return age <= this.selectedAgeRange.max && age >= this.selectedAgeRange.min || character.birth_year === 'unknown'} 
                )

                path = path + `age-range=${this.selectedAgeRange.min},${this.selectedAgeRange.max}__`
            }
            if(this.selectedHeightRange.max){
                result = result.filter(character => {
                    let height = Number(character.height)
                    return height <= this.selectedHeightRange.max && height >= this.selectedHeightRange.min}
                )

                path = path + `height-range=${this.selectedHeightRange.min},${this.selectedHeightRange.max}__`
            }

            //sort
            switch (this.selectedSortOption) {
                case 'age':
                    result = result.sort((prev, current) => Number(current.birth_year.split('BBY')[0]) - Number(prev.birth_year.split('BBY')[0]))
                    path = path + `sorted=${camelize(this.selectedSortOption)}__`
                    break;
                
                case 'mass':
                    result = result.sort((prev, current) => Number(current.mass) - Number(prev.mass))
                    path = path + `sorted=${camelize(this.selectedSortOption)}__`
                    break;

                case 'height':
                    result = result.sort((prev, current) => Number(current.height) - Number(prev.height))
                    path = path + `sorted=${camelize(this.selectedSortOption)}__`
                    break;    
            
                default:
                    break;
            }

            history.replaceState(
                {},
                null,
                path
            )

            this.filteredAndSorted = [...result]
        },
        parseFiltersFromURL(){
            const url = this.$route.path

            if(url.match(/eye-color=(\w+)__/)){
                const eyeColor = url.match(/eye-color=(\w+)__/)[1]
                this.selectedEyesColor = kebabize(eyeColor)
            }

            if(url.match(/sorted=(\w+)__/)){
                const sortOption = url.match(/sorted=(\w+)__/)[1]
                this.selectedSortOption = kebabize(sortOption)
            }
            
            if(url.match(/age-range=\d{1,3},\d{1,3}__/)){
                const ageRange = url.match(/age-range=\d{1,3},\d{1,3}__/)[0]
                const ageFrom = ageRange.match(/\d{1,3},\d{1,3}/)[0].split(',')[0]
                const ageTo = ageRange.match(/\d{1,3},\d{1,3}/)[0].split(',')[1]

                this.selectedAgeRange.min = Number(ageFrom)
                this.selectedAgeRange.max = Number(ageTo)
            }
            
            if(url.match(/height-range=\d{1,3},\d{1,3}__/)){
                const heightRange = url.match(/height-range=\d{1,3},\d{1,3}__/)[0]
                const heightFrom = heightRange.match(/\d{1,3},\d{1,3}/)[0].split(',')[0]
                const heightTo = heightRange.match(/\d{1,3},\d{1,3}/)[0].split(',')[1]

                this.selectedHeightRange.min = Number(heightFrom)
                this.selectedHeightRange.max = Number(heightTo)
            }
            
        }
    },
    created(){
        this.parseFiltersFromURL()
    },
    mounted(){
        const v = this
        
        axios({
            url: `${process.env.VUE_APP_SWAPI}people/`,
            method: 'get'
        })
        .then(response => {
            v.characters = response.data
            v.charactersLoaded = true
            v.filterAndSortCharacters()
        })
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/colors.scss';

.peoples{
    min-height: calc(100vh - 80px - 390px);

    display: flex;
    flex-flow: column;

    h1{
        font-size: 32px;
        line-height: 180%;
        font-weight: 400;
    }
    &__filters{
        margin-top: 24px;

        line-height: 104%;

        position: relative;

        z-index: 2;

        &>div{
            margin-left: 40px;
            width: auto;

            &:first-child{
                margin-left: 0;
            }
            &:last-child{
                position: absolute;
                right: 0;
            }
        }
    }

    &__container{
        margin-top: 30px;

        display: flex;
        justify-content: center;

        flex-grow: 1;
    }
    &__items{
        display: flex;
        flex-flow: wrap;
    }
    &__item{
        margin-top: 16px;

        &:nth-child(2n){
            margin-left: 16px;
        }

        animation: fadeIn .4s;
    }
    &__noPeoples{
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        margin: 0 16px;
    }
}

@media (max-width: 1432px) {
    .peoples{
        max-width: 608px;

        margin: 0 auto;

        &__filters{
            &>div{
                margin-left: 24px;
            }
        }

        &__item{
            &:nth-child(2n){
                margin-left: 0;
            }
        }
    }
}
@media (max-width: 520px) {
    .peoples{
        h1{
            font-size: 28px;
        }
        &__item{
            margin-top: 10px;

            display: flex;
            flex-flow: column;
            justify-content: flex-end;
        }
        &__filters{
           margin-top: 16px;
        }
        &__container{
            margin-top: 16px;
        }
    }
}
</style>