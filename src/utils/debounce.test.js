// Simple test for debounce functionality
import { debounce } from './debounce';

// Mock test function
const testDebounce = () => {
    let callCount = 0;

    const testFunction = () => {
        callCount++;
        console.log('Function called, count:', callCount);
    };

    const debouncedFunction = debounce(testFunction, 100);

    // Simulate rapid calls
    debouncedFunction();
    debouncedFunction();
    debouncedFunction();

    // After 150ms, should only have been called once
    setTimeout(() => {
        console.log('Final call count:', callCount);
        console.log('Debounce test completed');
    }, 150);
};

// Export for manual testing
export { testDebounce }; 