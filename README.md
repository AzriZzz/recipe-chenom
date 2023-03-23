# Recipe @CheNom

A web application showcasing a collection of cooking videos created by the YouTuber CheNom. The application enables users to browse, search, and bookmark their favorite dishes.

## Getting Started

These instructions will guide you through setting up and running the project on your local machine for development and testing purposes.

### Prerequisites

Ensure the following software and tools are installed:

- Node.js (v16.16.0 or higher)
- npm (v6.14.17 or higher)
- Next.js (v13 or higher)

### Installation

Follow these steps to set up and run the project locally:

1. Clone the repository:
git clone https://github.com/your-username/recipe-chenom.git


2. Navigate to the project folder:
cd recipe-chenom


3. Install the dependencies:
npm install


4. Start the development server:
npm run dev


5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Features

The primary features of the project encompass the following technical aspects:

1. Retrieval and display of all recipes from CheNom's YouTube channel using YouTube's Data API v3.
2. Implementation of a search functionality to enable users to find specific recipes within the platform.
3. Integration of a filtering system that allows users to categorize recipes based on specific criteria.
4. Implementation of a bookmark feature, enabling users to save their favorite recipes for easy access.
5. Utilization of the YouTube Data API v3 to fetch the latest video content dynamically.
6. Storage of bookmark data in the device's local storage, mitigating the need for database management.
7. Generation of daily JSON files to fetch the latest video content without reliance on a database connection.
8. Embedded video playback functionality within the website for non-mobile devices, with automatic redirection to the YouTube app on mobile devices.


## Usage

The application currently utilizes local JSON data. An API integration will be implemented once additional funding is secured.

## Built With

The project employs the following libraries, frameworks, and tools:

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework

## Contributing

Instructions for submitting pull requests or contributing to the project will be provided.

## License

This project is licensed under the [License Name] - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by afrieirham's Resipi Khairulaming, Recipe @CheNom serves as an adaptation of his original product.
