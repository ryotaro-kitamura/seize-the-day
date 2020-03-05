import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemEditComponent } from "./components/item-list/components/item-edit/item-edit.component";
import { ItemComponent } from "./components/item-list/components/item/item.component";
import { ItemListComponent } from "./components/item-list/item-list.component";
import { ItemListService } from "./components/item-list/item-list.service";
import reducer from "./store/store";

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ItemListComponent,
    ItemEditComponent,
    ItemAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ itemList: reducer }),
    StoreDevtoolsModule.instrument()
  ],
  providers: [ItemListService],
  bootstrap: [AppComponent]
})
export class AppModule {}
