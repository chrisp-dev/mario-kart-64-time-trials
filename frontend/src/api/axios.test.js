import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { getData, postData } from './axios'; 

vi.mock('axios');

describe('Axios API Functions', () => {
    it('should fetch data successfully', async () => {
        const mockData = { data: 'mockData' };
        axios.get.mockResolvedValueOnce(mockData);

        const data = await getData('/data');
        expect(data).toBe(mockData.data);
    });

    it('should post data successfully', async () => {
        const mockResponse = { status: 200 };
        axios.post.mockResolvedValueOnce(mockResponse);

        const response = await postData('/data', { key: 'value' });
        expect(response.status).toBe(200);
    });
});