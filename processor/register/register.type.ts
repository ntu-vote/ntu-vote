export interface postOut {
    status: string,
    message?: string
}

export interface postIn {
    params: {
        username: string,
        passwordHash: string,
        display_name: string,
        real_name: string,
        student_id: string,
        public_key: string,
        private_key: string
    }
}

export interface checkOut {
    status: string,
    result: string
}

export interface checkIn {
    params: {
        check_for: string
    }
}
