import { Component, enableProdMode } from '@angular/core';
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { DxDataGridComponent, DxDataGridModule } from "devextreme-angular";
import { ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';



if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
    styleUrls: ['execution-tests.component.scss'],
    selector: 'demo-app',
    templateUrl: 'execution-tests.component.html'
})
export class ExecutionTestComponent {

     
    customersData: any;
    shippersData: any;
    dataSource: any;
    url: string;
    masterDetailDataSource: any;


    executionTestsData: any;
    periodsData: any;
    categoriesData: any;    
    storageConditionsData: any;       
    measureConditionsData: any;         
    productsData: any;           
    parameterNamesData: any;            
    parameterValues: any;             
    selectionSetOptionItemsData: any;
    
    url2: string;

    onCellPrepared(e) {
        

        if (e.dataField === "selectedOptionItemId" && e.parentType === "dataRow") {
            if( e.row.data.parameterId != 8){                    
                e.editorOptions.disabled = true;
            }
        }

        if (e.dataField === "testValue" && e.parentType === "dataRow") {
            if( e.row.data.parameterId == 8){                    
                e.editorOptions.disabled = true;
            }
        }

        
    }

    validateNumber(e) {

        if(e.data.parameterPlausibilityCheck == 1 && (e.value < e.data.parameterPlausibilityMin || e.value > e.data.parameterPlausibilityMax)){

            e.rule.message = "The field Freight must be between "+  e.data.parameterPlausibilityMin +" and "+ e.data.parameterPlausibilityMax;
            return false;
        }
        
        return true;
    }

    setCellValue(newData, value) {
        let column = (<any>this);
        column.defaultSetCellValue(newData, value);
    }

    constructor() {
        this.url = "https://js.devexpress.com/Demos/Mvc/api/DataGridWebApi";
        
        this.url2 = "https://localhost:5001/api/ExecutionTests";
        
        this.dataSource = AspNetData.createStore({
            key: "OrderID",
            loadUrl: this.url + "/Orders",
            insertUrl: this.url + "/InsertOrder",
            updateUrl: this.url + "/UpdateOrder",
            deleteUrl: this.url + "/DeleteOrder",
            onBeforeSend: function(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        });

        this.customersData = AspNetData.createStore({
            key: "Value",
            loadUrl: this.url + "/CustomersLookup",
            onBeforeSend: function(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        });

        this.shippersData = AspNetData.createStore({
            key: "Value",
            loadUrl: this.url + "/ShippersLookup",
            onBeforeSend: function(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        });

        this.executionTestsData = AspNetData.createStore({
            key: "id",
            loadUrl: this.url2 + "/GetExecutionTests",
            updateUrl: this.url2 + "/UpdateExecutionTest",
            onBeforeSend: function(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        });

        this.periodsData = AspNetData.createStore({
            key: "id",
            loadUrl: this.url2 + "/GetPeriods",
            onBeforeSend: function(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        });

        this.categoriesData = AspNetData.createStore({            
            key: "id",
            loadUrl: this.url2 + "/GetCategories",
            onBeforeSend: function(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        });

        this.storageConditionsData = AspNetData.createStore({            
            key: "id",
            loadUrl: this.url2 + "/GetStorageConditions",
            onBeforeSend: function(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        });


        this.measureConditionsData = AspNetData.createStore({            
            key: "id",
            loadUrl: this.url2 + "/GetMeasureConditions",
            onBeforeSend: function(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        });

        this.productsData = AspNetData.createStore({            
            key: "id",
            loadUrl: this.url2 + "/GetProducts",
            onBeforeSend: function(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        });


        this.selectionSetOptionItemsData = AspNetData.createStore({            
            key: "Value",
            loadUrl: this.url2 + "/GetSelectionSetOptionItems",
            onBeforeSend: function(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        });

        
        this.parameterNamesData = AspNetData.createStore({            
            key: "id",
            loadUrl: this.url2 + "/GetParametersNames",
            onBeforeSend: function(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        });
    }
}