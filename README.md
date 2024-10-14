# Product Web Application

This project is a web application built using ASP.NET Core for the backend and Angular for the frontend. The application displays a list of products with two different view styles (detail and bottle views) and offers functionalities such as sorting by price and filtering products priced over 2€/Litre.

## Table of Contents

- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Running the Project](#running-the-project)
- [Backend API](#backend-api)

## Features

- **Two View Styles**:
  - **Detail View** (default): Displays product image, name, and price.
  - **Bottle View**: Displays product images only.
- **Sorting**: Users can sort products by price in ascending or descending order.
- **Filtering**: A toggle button allows filtering out products that are more expensive than 2€/Litre.
- **Backend API**: Provides the necessary data for the frontend, with filtering and sorting logic implemented server-side.
## Setup and Installation

### Prerequisites

- **.NET 8 SDK** : Required for building and running the backend. You can download it [here](https://dotnet.microsoft.com/en-us/download/dotnet/8.0).
- **Node.js (v18.19 or higher)**: Required for running the Angular frontend.
- **Angular CLI (v17.3.10+)**: You can install Angular CLI globally using `npm install -g @angular/cli`.

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/taherbarmo/Flaschenpost_SE.git

2. **Backend Setup (ASP.NET 8)**:

    Navigate to the Api folder and restore the dependencies.
   ```bash 
      cd Api 
      dotnet restore

3. **Frontend Setup (Angular)**:

    Navigate to the Client folder and install the dependencies.
   ```bash 
      cd Client
      npm install
   
## Running the Project

### Running the Backend (ASP.NET Core 8)

1. **Navigate to the Api folder**:

   ```bash
   cd Api
2. **Run the backend using the following command:**:

   ```bash
   dotnet run

### Running the Frontend (Angular)

1. **Navigate to the Client folder**:

   ```bash
   cd Client

2. **Start the Angular development server**:

   ```bash
   ng serve

The frontend will be accessible at http://localhost:4200.

### Backend API
   The backend is an ASP.NET Core API that provides product data and supports filtering and sorting. It reads product data from an external URL and serves it to the frontend.
 ## Endpoints
- **GET /api/Product:** Retrieves products with sorting and filtering options.
   - Query Parameters: 
      - **sortOrder (asc | desc):** Sorts products by price.
      - **filterByPrice (true | false):** Filters products by price (over or under 2€/Litre).
      - **viewType (detail | bottle):** Chooses the view format for the data (full details or images).

