<template>
    <footer>
        <div class="container">
            <div class="footer">
                <div class="footer__elem footer__logo">
                    <div class="logo">
                        <a href="/"></a>
                        <img src="@/assets/images/star_wars.svg" alt="">
                    </div>
                    <ul class="footer__links">
                        <li class="footer__link main-button">
                            <img src="@/assets/images/fackebook.svg" alt="">
                            <a href=""></a>
                        </li>
                        <li class="footer__link main-button">
                            <img src="@/assets/images/instagram.svg" alt="">
                            <a href=""></a>
                        </li>
                    </ul>
                </div>
                <div class="footer__elem footer__social">
                    <p>All rights Reserved.</p>
                    <p>Privacy Policy</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '@/assets/colors.scss';

footer{
    background-color: $primary;

    margin-top: auto;
}
.footer{
    display: flex;
    flex-flow: column;

    padding: 43px 0 21px;

    &__elem{
        display: flex;
        justify-content: space-between;

        height: 100%;

        &:last-child{
            margin-top: 65px;

            p{
                font-weight: 300;
                line-height: 180%;
                color: $footer-text;
            }
        }
    }


    &__social{
        align-items: flex-end;
    }
    &__links{
        display: flex;
    }
    &__link{
        position: relative;

        display: flex;
        justify-content: center;
        align-items: center;

        min-width: 40px;
        max-height: 40px;

        &:last-child{
            margin-left: 16px;
        }
        a{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;

            height: 100%;
            width: 100%;

            display: block;
        }
    }
}

@media(max-width: 900px){
    .footer{
        &__elem{
            &:first-child{
               flex-flow: column; 
            }
        }
        &__links{
            margin-top: 24px;
        }
    }
}
@media(max-width: 520px){
    .footer{
        &__elem{
            &:last-child{
               margin-top: 40px;
            }
        }
        &__link{
            min-height: 32px;
            min-width: 32px;
            max-height: 32px;
            max-width: 32px
        }
    }
}
</style>