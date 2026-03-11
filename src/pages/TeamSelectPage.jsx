import React, { useEffect, useState } from "react";
import css from "./TeamSelectPage.module.css";
import { getAllTeam } from "@/api/teamApi";
import TeamCard from "@/components/teamCard";
import { updateUserTeam } from "@/api/userApi";
import { useNavigate  } from "react-router-dom";

const TeamSelectPage = () => {
  // 상태: 모든 구단 정보, 선택한 구단 정보
  const [allTeam, setAllTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const navigate = useNavigate();

  // user가 선택한 구단정보 가져오기
  useEffect(() => {
    const loadTeam = async () => {
      try {
        setLoading(true);

        const teams = await getAllTeam();

        setAllTeam(teams);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    loadTeam();
  }, []);

  // 선택한 구단 서버에 업데이트
 const handleConfirmSelection = async () => {
    try {
      setLoading(true);
      
      await updateUserTeam(1, selectedTeam);
      navigate("/?changed=1");
      
    } catch (err) {
      console.error("구단 업데이트 실패:", err);
      alert("구단 선택에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className={css.mainContainer}>
        <div className={css.header}>
          <h2> 나의 구단을 선택하세요 </h2>
          <p>응원하는 구단을 선택하면 맞춤형 정보를 제공해드립니다.</p>
        </div>

        {/* 구단 선택 영역 */}
        <div className={css.teamGrid}>
          {allTeam.length === 0 ? (
            <p className={css.noPost}>구단 데이터가 없습니다.</p>
          ) : (
            <div className={css.postGrid}>
              {allTeam.map((team) => (
                <TeamCard
                  key={team.id}
                  data={team}
                  selected={selectedTeam === team.id}
                  onSelect={() => setSelectedTeam(team.id)}
                />
              ))}
            </div>
          )}

          <button
            className={css.confirmButton}
            onClick={handleConfirmSelection}
            disabled={loading || !selectedTeam}
          >
            {loading ? "처리 중..." : "선택 완료"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default TeamSelectPage;
