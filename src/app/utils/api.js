const API_BASE_URL = 'https://687212ff76a5723aacd38af5.mockapi.io';

// Fetch all teachers
export const fetchTeachers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/teacher`);
        if (!response.ok) {
            throw new Error('Failed to fetch teachers');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching teachers:', error);
        throw error;
    }
};

// Add a new teacher
export const addTeacher = async (teacherData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/teacher`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teacherData),
        });

        if (!response.ok) {
            throw new Error('Failed to add teacher');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding teacher:', error);
        throw error;
    }
};

// Update a teacher
export const updateTeacher = async (id, teacherData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/teacher/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teacherData),
        });

        if (!response.ok) {
            throw new Error('Failed to update teacher');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating teacher:', error);
        throw error;
    }
};

// Delete a teacher
export const deleteTeacher = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/teacher/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete teacher');
        }

        return true;
    } catch (error) {
        console.error('Error deleting teacher:', error);
        throw error;
    }
};
