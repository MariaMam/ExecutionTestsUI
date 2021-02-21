
import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from "devextreme-angular";
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import ArrayStore from 'devextreme/data/array_store';
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import CustomStore from 'devextreme/data/custom_store';

@Component({
    selector: 'app-execution-tests-vertically',
    templateUrl: './execution-tests-vertically.component.html',
    styleUrls: ['./execution-tests-vertically.component.scss']
})

export class ExecutionTestsVerticallyComponent {
    @ViewChild("drillDownDataGrid", { static: false }) drillDownDataGrid: DxDataGridComponent
    @ViewChild("drillDownDataGrid2", { static: false }) drillDownDataGrid2: DxDataGridComponent
    data: ArrayStore;


    dataStore: CustomStore;

    drillDownDataSource: any;
    dataGridDataSource: any;

    popupVisible = false;
    popupVisible2 = false;
    popupTitle: string;
    isSelectionSetOptionItems: boolean = false;

    dataSource2: PivotGridDataSource;


    selectionSetOptionItemsData: any;
    parameterPlausibilityMin :any;
    parameterPlausibilityMax : any;

    url2: string;
    baseUrl:string;


    validateNumber(e) {

        if (e.data.parameterPlausibilityCheck == 1 && (e.value < e.data.parameterPlausibilityMin || e.value > e.data.parameterPlausibilityMax)) {

            e.rule.message = "The field Freight must be between " + e.data.parameterPlausibilityMin + " and " + e.data.parameterPlausibilityMax;            
        }

        return true;
    }

    constructor() {

        this.data = new ArrayStore({
            key: "id"
        });

        this.baseUrl = window.location.origin;

        this.url2 = this.baseUrl + "/api/ExecutionTests";

        var a = this.url2 + "/GetSelectionSetOptionItems"

        this.selectionSetOptionItemsData = AspNetData.createStore({
            key: "Value",
            loadUrl: this.url2 + "/GetSelectionSetOptionItems",
            onBeforeSend: function (method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        });


        this.dataStore = AspNetData.createStore({
            key: "id",
            loadUrl: this.url2 +"/GetExecutionTestsPivot",
            updateUrl: this.url2 + "/UpdateExecutionTest",
            onBeforeSend: function (method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        });

        this.dataSource2 = new PivotGridDataSource({
            remoteOperations: true,
            store: this.dataStore,
            fields: [
                {
                    caption: "Storage Condition",
                    dataField: "climaticConditionName",
                    width: 100,
                    sortOrder: "desc",
                    area: "row",
                    expanded: true
                },
                {
                    caption: "Category Name",
                    dataField: "categoryName",
                    width: 100,
                    sortOrder: "desc",
                    area: "row",
                    expanded: true
                },
                {
                    caption: "Time Series",
                    dataField: "periodeName",
                    width: 100,
                    sortOrder: "asc",
                    area: "row",
                    expanded: true
                },
                {
                    caption: "Measure Condition",
                    dataField: "measureConditionName",
                    width: 100,
                    sortOrder: "desc",
                    area: "row",
                    expanded: true
                },
                {
                    caption: "Parameter Name",
                    dataField: "parameterName",
                    width: 100,
                    sortOrder: "desc",
                    area: "row",
                    expanded: true
                }, {
                    caption: "Product",
                    dataField: "productName",
                    area: "column",
                    sortOrder: "asc",
                    width: 100
                }, {
                    caption: "Result",
                    dataField: "testValue",
                    summaryType: "min",
                    area: "data"
                }, {
                    dataField: "Id",
                    visible: false
                }]
        });

        this.dataSource2.expandAll("periodeName");

    }



    onCellClick2(e) {
        if (e.area == "data") {
            var text = e.cell.rowPath + " : " + e.cell.columnPath
            var rowPathLength = e.cell.rowPath.length,
                rowPathName = e.cell.rowPath[rowPathLength - 1],
                popupTitle = text//(rowPathName ? rowPathName : "Total") + " Drill Down Data";

            this.drillDownDataSource = this.dataSource2.createDrillDownDataSource(
                e.cell
            );
            this.isSelectionSetOptionItems = e.cell.rowPath[4] == "Odour HFC Assessment"


           

            this.popupTitle = popupTitle;
            this.popupVisible2 = true;
        }
    }


    onPopupShowing2(e) {
        var that = this;
        this.drillDownDataSource.store().load().done(function (items) {
            that.dataGridDataSource = {
                store: new ArrayStore({
                    key: that.data.key(),
                    data: items
                })               
            };
        });
    }

    onCellPrepared(e) {

       /* if (e.area === "data") {

            this.drillDownDataSource = this.dataSource2.createDrillDownDataSource(e.cell);

            var that = this;
            var data: Array<any>;

            this.drillDownDataSource.store().load().done(function (items) {

                if(items[0].testValue == null || items[0].testValue == ""){
                    e.cellElement.style.backgroundColor = "LightGrey";
                }
                else if (items[0].isFailed) {
                    e.cellElement.style.backgroundColor = "Orange";
                }
                else if (!items[0].isFailed) {
                    e.cellElement.style.backgroundColor = "lightGreen";
                }
                else{
                    var a = items[0]
                }
            });
        }

        if (e.dataField === "testValue" && e.parentType === "dataRow") {
            if (e.row.data.parameterId == 8) {
                e.editorOptions.disabled = true;
            }
        }*/
    }

    onPopupHiding(e) {
        this.dataSource2.reload();
    }

    onPopupShown(e) {
        this.drillDownDataGrid.instance.updateDimensions();
    }

    onPopupShown2(e) {
        this.drillDownDataGrid2.instance.updateDimensions();
    }

    onRowUpdating(e) {

        this.dataStore.update(e.key, e.newData);
        this.data.update(e.key, e.newData);
    }

    onRowAdding(e) {
        this.data.insert(e.data);
    }

    onRowRemoving(e) {
        this.data.remove(e.key);
    }
}
