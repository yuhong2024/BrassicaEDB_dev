import axios from 'axios';

// 通过API获取基因表达数据
export const fetchTranscriptomeData = async (species, geneIdsArray) => {
    try {
        const response = await axios.post('https://brassica.wangyuhong.cn/api/transcriptomedata/', {
            species: species,
            gene_ids: geneIdsArray
        });
        return response.data; // 返回从 API 获取的数据
    } catch (error) {
        console.error('API 请求错误: ', error);
        throw error;
    }
};
