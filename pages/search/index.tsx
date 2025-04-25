import { Meta } from '@/components/layouts/Meta';
import { MainLayout } from '@/components/layouts/MainLayout';
import { MainSearch } from '@/components/main/MainSearch/MainSearch';


const Search = () => {

  return (
    <>
      <Meta
        title="Поиск title"
        description="Поиск направлений описание"
        canonical="https://блаблаавто.рф/search"
        ogTitle="title для соцсетей"
        ogDescription="Описание для соц-сетей"
      />
      <MainLayout>
        <MainSearch />
      </MainLayout>
    </>
  );
};

export default Search;