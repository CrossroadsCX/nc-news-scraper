import axios from 'axios';
import { differenceInCalendarDays } from 'date-fns';
const articlesDayFilter = (articleDate, currentDate, days) => {
    const daysDifference = differenceInCalendarDays(currentDate, articleDate);
    if (daysDifference <= days) {
        return true;
    }
    return false;
};
export const filterByDays = async (articles, days = 2) => {
    const ETDate = await getEasternTime();
    const filteredArticles = articles.filter((article) => {
        if (article.dateTime) {
            const articleDate = new Date(parseInt(article.dateTime));
            return articlesDayFilter(articleDate, ETDate, days);
        }
        return false;
    });
    return filteredArticles;
};
export const sortByDate = (articles) => {
    return articles.sort((a, b) => {
        if (a.dateTime && b.dateTime) {
            return parseInt(b.dateTime) - parseInt(a.dateTime);
        }
        return 0;
    });
};
export const convertTZ = (date, tzString) => {
    return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }));
};
export const getEasternTime = async () => {
    const { data, status } = await axios.get('http://worldtimeapi.org/api/timezone/America/New_York');
    if (status !== 200) {
        throw new Error('Error fetching time');
    }
    const ETDate = new Date(data.datetime);
    return ETDate;
};
//# sourceMappingURL=dates.js.map