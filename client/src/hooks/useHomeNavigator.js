// hooks/useHomeNavigator.js


const useHomeNavigator = () => {

    // Role-based navigation logic
    return (role) => {
        switch (role) {
            case "admin":
               return "/super-admin-panel"; // Admin dashboard
                
            case "hr":
               return "/hr/home"; // HR homepage
                
            case "user":
              return "/job-board"; // User homepage
                
            default:
               return "/"; // Default to homepage if no role is matched
                
        }
    }
};

export default useHomeNavigator;
