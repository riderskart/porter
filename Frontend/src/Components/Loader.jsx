import React from "react";
import Lottie from "lottie-react";
import Loading from "../assets/Loading/Loading.json";

const Loader = ({ width = 50, height = 50, className = "" }) => {
  // function disable() {}

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Lottie width={width} height={height} animationData={Loading} />
    </div>
  );
};

export default Loader;

// import React from "react";
// import Lottie from "lottie-react";
// import Loading from "../assets/Loading/Loading.json";

// // LoadingManager class handles the loading state and visibility of the loader component
// class LoadingManager {
//   constructor() {
//     // Initialize loading state and element reference
//     this.isLoading = false; // Tracks if loader is currently active
//     this.loadingElement = null; // Reference to the loader DOM element
//   }

//   // Show the loader
//   enable() {
//     this.isLoading = true;
//     if (this.loadingElement) {
//       this.loadingElement.style.display = 'flex';
//     }
//   }

//   // Hide the loader
//   disable() {
//     this.isLoading = false;
//     if (this.loadingElement) {
//       this.loadingElement.style.display = 'none';
//     }
//   }

//   // Store reference to loader DOM element
//   setLoadingElement(element) {
//     this.loadingElement = element;
//   }

//   // Get current loading state
//   getLoadingState() {
//     return this.isLoading;
//   }
// }

// // Create singleton instance of LoadingManager
// const loadingManager = new LoadingManager();

// // Loader component displays a loading animation
// const Loader = ({ width = 50, height = 50, className = "" }) => {
//   // Reference to loader div element
//   const loaderRef = React.useRef(null);

//   // Store reference to loader element in LoadingManager when component mounts
//   React.useEffect(() => {
//     loadingManager.setLoadingElement(loaderRef.current);
//   }, []);

//   return (
//     <div
//       ref={loaderRef}
//       className={`flex justify-center items-center ${className}`}
//     >
//       {/* Lottie animation component */}
//       <Lottie width={width} height={height} animationData={Loading} />
//     </div>
//   );
// };

// // Export Loader component as default and loadingManager instance
// export { Loader as default, loadingManager };
