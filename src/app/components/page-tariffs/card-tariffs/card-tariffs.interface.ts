import { SafeHtml } from "@angular/platform-browser";

export interface item {
    icon: SafeHtml;
    price: number;
    title: string;
    conditions: condition[];
    descriptions: string[];
  }

export interface condition {
    title: string;
    value: string;
    textItem: string;
  }