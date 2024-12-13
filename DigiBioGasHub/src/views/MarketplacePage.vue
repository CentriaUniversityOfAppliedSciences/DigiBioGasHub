<template>
    <ion-page>
        <NavBarComponent />
        <div class="marketplace-page">
            <ion-grid>
                <ion-row>
                    <ion-col size="12" size-sm="6" size-md="4" v-for="product in products" :key="product.id">
                        <ListingComponent :product="product" />
                    </ion-col>
                </ion-row>
            </ion-grid>
        </div>
        <FooterComponent />
    </ion-page>
</template>